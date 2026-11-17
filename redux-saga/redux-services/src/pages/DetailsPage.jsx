import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { fetchDetailsRequest } from "../services/servicesSlice";

function DetailsPage() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { details, detailsLoading, detailsError } = useSelector(
    (state) => state.services
  );

  useEffect(() => {
    dispatch(fetchDetailsRequest(id));
  }, [dispatch, id]);

  if (detailsLoading) {
    return <p>Загрузка...</p>;
  }

  if (detailsError) {
    return (
      <div>
        <p role="alert">{detailsError}</p>

        <button onClick={() => dispatch(fetchDetailsRequest(id))}>
          Повторить запрос
        </button>
      </div>
    );
  }

  if (!details) {
    return null;
  }

  return (
    <div>
      <h1>{details.name}</h1>

      <p>Стоимость: {details.price} ₽</p>

      <p>{details.content}</p>

      <Link to="/">Назад к списку</Link>
    </div>
  );
}

export default DetailsPage;