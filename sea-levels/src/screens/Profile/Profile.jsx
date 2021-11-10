import { useState, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import app from '../../services/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import defaultAvatar from '../../images/default-avatar.png';
import './profile.css';

const MAX_FILE_SIZE = 2097152;

const uploadUserAvatar = file => {
	const storage = getStorage();
	const ext = file.name.substring(file.name.lastIndexOf('.') + 1);
	const user = app.auth().currentUser;
	const avatarRef = ref(storage, `user-avatars/${user.uid}.${ext}`);

	return new Promise((resolve, reject) => {
		uploadBytes(avatarRef, file).then(({ ref }) => {
			if (!!ref) {
				getDownloadURL(ref).then(downloadURL => {
					if (!!downloadURL) {
						updateProfile(user, { photoURL: downloadURL }).then(() => {
							resolve(downloadURL);
						}).catch(error => {
							reject(error);
						});
					} else {
						reject('Upload failed!');
					}
				});
			} else {
				reject('Upload failed!');
			}
		});
	});
};

const Profile = ({ user, changeNavAvatar }) => {
	const history = useHistory();

	const [form, setForm] = useState({
		firstName: '',
		lastName: '',
		occupants: '',
		streetNumber: '',
		streetName: '',
		town: '',
		state: '',
		zipCode: '',
	});

	const [photoURL, setPhotoURL] = useState('');

	const currentUser = app.auth().currentUser;

	const handleChange = ({ target }) => {
		const { name, value } = target;

		setForm({ ...form, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const db = app.firestore();

		await db.collection('users').doc(user).set({ ...form, photoURL });

		history.push('/dashboard');
	};

	const onFileChange = ({ target }) => {
		if (!target.files[0]) return;

		if (target.files[0].size > MAX_FILE_SIZE) {
			console.error('File too large!');

			return;
		}

		console.log('uploading...');

		uploadUserAvatar(target.files[0]).then(photoURL => {
			const db = app.firestore();
			setPhotoURL(photoURL);
			db.collection('users').doc(user).update({ photoURL });
			changeNavAvatar(photoURL);
			console.log('done!');
		}, error => {
			console.error(error);
		});
	};

	const avatar = useMemo(() => {
		if (!!photoURL) {
			return photoURL;
		} else if (!!currentUser?.photoURL) {
			return currentUser.photoURL;
		} else {
			return defaultAvatar;
		}
	}, [currentUser, photoURL]);

	useEffect(() => {
		const fetchUserData = async () => {
			if (!user) return;

			try {
				const db = app.firestore();
				const doc = await db.collection('users').doc(user).get();
				const userInfo = doc.data();

				if (!!userInfo) {
					setForm({ ...userInfo });
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchUserData();
	}, [user]);

	return (
		<div className="profile-container">
			<form onSubmit={handleSubmit}>
				<div className="avatar-container">
					<input
						id="avatar-file"
						name="avatar-file"
						className="file-input"
						type="file"
						accept="image/*"
						onChange={onFileChange}
					/>
					<label htmlFor="avatar-file">
						<div className="avatar-mask">
							<img
								className="avatar"
								src={avatar}
								alt="Upload Photo"
							/>
						</div>
					</label>
				</div>

				<input
					type="text"
					name="firstName"
					id="firstName"
					placeholder="First Name"
					value={form.firstName.charAt(0).toUpperCase() + form.firstName.slice(1).toLocaleLowerCase()}
					onChange={handleChange}
					required
					autoFocus
				/>

				<input
					type="text"
					name="lastName"
					id="lastName"
					placeholder="Last Name"
					value={form.lastName.charAt(0).toUpperCase() + form.lastName.slice(1).toLocaleLowerCase()}
					onChange={handleChange}
					required
				/>

				<input
					type="number"
					name="occupants"
					id="occupants"
					placeholder="Occupants"
					value={form.occupants}
					onChange={handleChange}
					required
				/>

				<input
					type="text"
					name="streetNumber"
					id="streetNumber"
					placeholder="Street Number"
					value={form.streetNumber}
					onChange={handleChange}
					required
				/>

				<input
					type="text"
					name="streetName"
					id="streetName"
					placeholder="Street Name"
					value={form.streetName}
					onChange={handleChange}
					required
				/>

				<input
					type="text"
					name="town"
					id="town"
					placeholder="Town"
					value={form.town}
					onChange={handleChange}
					required
				/>

				<input
					type="text"
					name="state"
					id="state"
					placeholder="State"
					value={form.state.toUpperCase()}
					onChange={handleChange}
					maxLength="2"
					required
				/>

				<input
					type="number"
					name="zipCode"
					id="zipCode"
					placeholder="Zip Code"
					value={form.zipCode}
					onChange={handleChange}
					maxLength="5"
					pattern="[0-9.]+"
					required
				/>

				<div className="button-wrapper">
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	);
};

export default Profile;
