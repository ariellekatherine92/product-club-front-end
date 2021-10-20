import app from "../../services/firebase";

const Chat = () => {
  function ChatRoom() {
    const db = app.firestore();
    const messagesRef = db.collection("messages");
    const query = messagesRef.orderBy("createdAt").limit(25);
    
    //listen to data with a hook
    const [messages] = useCollectionData(query, { idField: "id" });
  
  }



  return (
    <div>
      {message &&
        messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
    </div>
  );
};

export default Chat;
