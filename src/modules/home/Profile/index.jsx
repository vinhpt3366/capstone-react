import Loading from "../../../components/Loading";
import Navbar from "../../../components/Navbar/Navbar";
import Profile from "../../../components/Profile";

export default function ProfilePage() {
  return (
    <>
      <Loading />
      <Navbar />
      <div className="w-full max-w-[1200px] mx-auto p-4 mt-14">
        <Profile />
      </div>
    </>
  );
}
