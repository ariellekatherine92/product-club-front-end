import { useState }from "react";
const dateFormate = new Date()
const Popup = () => {
  const [form, setForm] = useState({
    name: '',
    location: '',
    needs: [],
    type: '',
    dateTime:'',
    active: false
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setForm({
      ...form,
      [name]:value
    })
  }
  return (
    <form>
      <input type="text" placeholder='Name' name='name' value={form.name} onChange={handleChange}/>
      <input type="text" placeholder='Location'name='location' value={form.location} onChange={handleChange}/>
      <input type="text" placeholder='Needs' name='needs' value={form.needs} onChange={handleChange}/>
      <input type="text" placeholder='Type' name='type' value={form.type} onChange={handleChange}/>
      <input type="datetime-local" placeholder='Date' name='dateTime' value={(dateFormate.toLocaleDateString('en-US'))} onChange={handleChange}/>
      <input type="radio" placeholder="Active"  name ='active' checked={form.active} onChange={handleChange}/>
    </form>
  );
};

export default Popup;
