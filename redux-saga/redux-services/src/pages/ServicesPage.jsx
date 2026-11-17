import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchServicesRequest } from "../services/servicesSlice";

function ServicesPage() {
  const dispatch = useDispatch();

  const { list, listLoading, listError } = useSelector(
    (state) => state.services
  );

  useEffect(() => {
    dispatch(fetchServicesRequest());
  }, [dispatch]);

  if (listLoading) {
    return <p>Загрузка услуг...</p>;
  }

  if (listError) {
    return (
      <div>
        <p role="alert">{listError}</p>

        <button onClick={() => dispatch(fetchServicesRequest())}>
          Повторить запрос
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Список услуг</h1>

      <ul>
        {list.map((service) => (
          <li key={service.id}>
            <Link to={`/${service.id}/details`}>
              {service.name} — {service.price} ₽
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ServicesPage;