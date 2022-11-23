import Pusher from "pusher";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      // Get all messages
      res.status(200).json({ messages: "work" });
      break;
      
    case "POST":
      // Create a message
      const { username, message } = req.body;
      // console.log('msg', req.body);

      const pusher = new Pusher({
        appId: process.env.app_id,
        key: process.env.key,
        secret: process.env.secret,
        cluster: process.env.cluster,
      });

      // Trigger pusher event
      pusher.trigger("chat", "message", {
        id: (Math.random() + 1).toString(36).substring(7),
        username,
        message,
      });

      res.status(200).json({ message: "good" });
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
