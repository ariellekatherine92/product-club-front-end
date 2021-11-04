import { useState, useEffect } from "react";
import ButtonMailto from "../../components/ButtonMailto";
import app from "../../services/firebase";


const Emergencies = (props) => {
  const [alerts, setAlerts] = useState([]);
  

  useEffect(() => {
    const fetchAlerts = async () => {
      const db = app.firestore();
      await db
        .collection(`emergencies`)
        .get()
        .then((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => doc.data());
          setAlerts(data);
          
        });
    };
    fetchAlerts();
  }, [props.toggleFetch]);

  return (
    <div>
      <h1>Ongoing Emergencies</h1>
      <ul>
        {alerts.map((alert) => (
          <ol>
            {alert.name} {alert.location} {alert.type} {alert.needs}
            {alert.dateTime.toLocaleString()}  
            <ButtonMailto label='E-Mail' mailto={'mailto:'+ alert.email}/>
          </ol>
        ))}
      </ul>
    </div>
  );
};

export default Emergencies;
