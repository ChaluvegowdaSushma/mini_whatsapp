import App from "../../App";

const LoginComponent = () => {

  const info = {
    email: "sushma@gmail.com",
    name: "Sushma",
    imageUrl: "/whatsapp/profile/contactPicture.jpeg"
  }

  return <App userInfo={info} />
};
export default LoginComponent;
