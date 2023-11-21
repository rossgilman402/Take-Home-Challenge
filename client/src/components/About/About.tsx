import "./About.css";
import petLogo from "../../../public/pet-pictures-high-resolution-logo-transparent.png";

const About = () => {
  return (
    <div className="about-container">
      <h2>Welcome to Pet Pictures!</h2>
      <img src={petLogo} alt="Pet Logo" />
      <p>
        This social media platform is created so that users can share pictures
        of their pets! Any user can download as many pictures of their friends
        pets as they desire. To start create an account and or login.
      </p>
    </div>
  );
};

export default About;
