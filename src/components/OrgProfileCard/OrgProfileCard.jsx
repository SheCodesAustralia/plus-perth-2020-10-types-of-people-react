import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import EventCard from "../EventCard/EventCard";
import "./OrgProfileCard.css";

const OrgProfileCard = (props) => {
  const [OrgDataProfile, setOrgDataProfile] = useState({});
  let user = window.localStorage.getItem("username");
  const [isBusy, setBusy] = useState(true);
  const [eventsHosted, setEventsHosted] = useState([]);

  const fetchOrg = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/org/${props.props.username}/profile/`
    );
    if (response.ok) {
      // console.log(response);
      const data = await response.json();
      if (data) {
        setOrgDataProfile(data);
        // console.log(data);
        // setBusy(false);
      }
      return;
    }
    const data = await response.json();
  };

  const fetchOrgEvents = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}events/${props.props.username}/events-hosted/`
    );
    if (response.ok) {
      // console.log(response);
      const data = await response.json();
      if (data) {
        setEventsHosted(data);
        // console.log(data);
        setBusy(false);
      }
      return;
    }
    const data = await response.json();
  };

  useEffect(() => {
    fetchOrg();
    fetchOrgEvents();
  }, []);

  const org_profile = {
    is_org: props.props.is_org,
    username: props.props.username,
    email: props.props.email,
    company_name: OrgDataProfile.company_name,
    contact_name: OrgDataProfile.contact_name,
    org_bio: OrgDataProfile.org_bio,
    image:
      "https://cdn.shecodes.com.au/wp-content/uploads/2018/10/SheCodes-01.png",
    // OrgDataProfile.image,
  };

  // const [events, setEvents] = useState(eventsHosted);

  function IsOwnerCanEdit() {
    // if (username != null) {
    if (user === org_profile.username) {
      return (
        <div id="owner-links">
          <Link to={`/profile/${user}/edit`}>
            <p>Edit</p>
          </Link>
          <Link to={`/profile/${user}/delete`}>
            <p>Delete</p>
          </Link>
        </div>
      );
    } else {
      return <p></p>;
    }
  }
  // }

  return (
    <>
      {isBusy ? (
        <p>loading</p>
      ) : (
        <>
          <div id="profile-exist">
            {(org_profile.company_name === null ||
              org_profile.company_name === undefined) &&
            // (org_profile.image === null || org_profile.image === undefined)&&
            (org_profile.org_bio === null ||
              org_profile.org_bio === undefined) &&
            (org_profile.contact_name === null ||
              org_profile.contact_name === undefined) ? (
              <div>
                <h2>{org_profile.username}</h2>
                <h2>There is no user profile set up for this user </h2>
                {user === org_profile.username ? (
                  <>
                    <p>Tell us about yourself and your skills</p>
                    <IsOwnerCanEdit />
                    <br></br>
                    <p>Email: {org_profile.email}</p>
                  </>
                ) : (
                  <p></p>
                )}
              </div>
            ) : (
              <>
                <div id="o-profile-sections-1-2">
                  <div id="o-profile-section-1">
                    <div id="o-profile-left">
                      <h1>{org_profile.company_name}</h1>
                      <h3>{org_profile.username}</h3>
                      <h3>Is organisation: {org_profile.is_org}</h3>
                      <h5>Contact person: {org_profile.contact_name}</h5>
                      <h5>{org_profile.email}</h5>
                      <IsOwnerCanEdit />
                    </div>
                    <div id="o-profile-right">
                      <img
                        id="o-profile-image"
                        src={org_profile.image}
                        alt={org_profile.name}
                      />
                    </div>
                  </div>
                  <div id="o-profile-section-2">
                    <h3>Bio</h3>
                    <p>{org_profile.org_bio}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
      <div id="m-profile-section-3">
        <h3>Events hosted</h3>
        <div className="event-grid">
          {eventsHosted.map((eventData, key) => {
            return <EventCard key={key} eventData={eventData} />;
          })}
        </div>
      </div>
    </>
  );
};

export default OrgProfileCard;
