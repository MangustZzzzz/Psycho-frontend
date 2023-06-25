import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { fetchUserSavedTests } from "../redux/slices/user-saved-slice.js";

import List from "./saved-page/list-block";
import ShowListItem from "./saved-page/show-block";
import Navigation from "./subcomponents/navigation";
import Loader from "./subcomponents/loader";

import "../scss/components/subcomponents/savedResult-page.scss";

function SavedResultPage() {
  const dispatch = useDispatch();
  const savedTests = useSelector((store) => store.savedTests);
  const user = useSelector((store) => store.user);
  const [showShowingTest, setShowingTest] = useState({});

  React.useEffect(() => {
    dispatch(fetchUserSavedTests());
  }, []);
  if (user.status !== "auth") {
    return <Navigate to="/" />;
  }
  if (savedTests.status === "loading") {
    return (
      <>
        <Navigation />
        <Loader />
      </>
    );
  } else if (savedTests.status === "loaded") {
    return (
      <>
        <Navigation />
        <section className="saved__result--page">
          <List setShowingTest={setShowingTest} />
          <ShowListItem showShowingTest={showShowingTest} />
        </section>
      </>
    );
  } else {
    return <p>Error</p>;
  }
}

export default SavedResultPage;
