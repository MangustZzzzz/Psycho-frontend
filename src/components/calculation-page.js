import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchServiceData } from "../redux/slices/service-slice";
import { setMethodology } from "../redux/slices/session-slice";

import InputData from "./subcomponents/calculation-page/input-data";
import Table from "./subcomponents/calculation-page/table";
import OutputData from "./subcomponents/calculation-page/output-data";
import Navigation from "../components/subcomponents/navigation";
import Loader from "./subcomponents/loader";

import "../scss/components/subcomponents/calculation-page.scss";

function CalculationPage() {
  const dispatch = useDispatch();
  const service = useSelector((state) => state.service);
  React.useEffect(() => {
    dispatch(fetchServiceData());
  }, []);

  if (service.status === "loaded") {
    return (
      <>
        {window.innerWidth > 400 ? <Navigation /> : ""}

        <section className="calculation--page">
          <InputData />
          <Table />
          <OutputData />
        </section>
      </>
    );
  } else {
    return (
      <>
        <Navigation />
        <Loader />
      </>
    );
  }
}

export default CalculationPage;
