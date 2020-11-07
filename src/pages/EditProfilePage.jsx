import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import EditOrgProfileForm from "../components/OrgProfileCard/EditOrgProfileForm";
import EditMentorProfileForm from "../components/MentorProfileCard/EditMentorProfileForm";

function EditProfilePage() {
  const [userData, setUserData] = useState({});
  const [orgDataProfile, setOrgDataProfile] = useState({});
  const [mentorDataProfile, setMentorDataProfile] = useState({});
  const [isBusy, setBusy] = useState(true);
  const { username } = useParams();
  const [LoggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  let username_ST = window.localStorage.getItem("username");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    token != null ? setLoggedIn(true) : setLoggedIn(false);
  }, [location]);

  const fetchUser = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/${username}/`
    );
    if (response.ok) {
      const data = await response.json();
      if (data) {
        setUserData(data);
      }
      return;
    }
    const data = await response.json();
  };

  const fetchOrgProfile = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/org/${username_ST}/profile/`
    );
    if (response.ok) {
      const data = await response.json();
      if (data) {
        setOrgDataProfile(data);
        setBusy(false);
      }
      return;
    }
    const data = await response.json();
  };

  const fetchMentorProfile = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/mentor/${username_ST}/profile/`
    );
    if (response.ok) {
      const data = await response.json();
      if (data) {
        setMentorDataProfile(data);
        setBusy(false);
      }
      return;
    }
    const data = await response.json();
  };

  useEffect(() => {
    fetchUser();
    // fetchMentorProfile();
    // fetchOrgProfile();
    userData.is_org ? fetchOrgProfile() : fetchMentorProfile();
  }, []);

  return (
    <div>
      {isBusy ? (
        <p>loading</p>
      ) : // ) : LoggedIn && username_ST == username ? (
      LoggedIn ? (
        <>
          {userData.is_org ? (
            <EditOrgProfileForm
              userData={userData}
              orgDataProfile={orgDataProfile}
            />
          ) : (
            <EditMentorProfileForm
              userData={userData}
              mentorDataProfile={mentorDataProfile}
            />
          )}
        </>
      ) : (
        <>
          <p>Login to create a profile </p>
        </>
      )}
    </div>
  );
}

export default EditProfilePage;