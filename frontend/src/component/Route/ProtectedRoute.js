import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component }) => {
	const { loading, isAuthenticated, userDetail } = useSelector((state) => state.user);
	const { params } = useParams();

	return (
		<>
			{loading === false && (
				<>
					{isAuthenticated === false && <Navigate to="/login" />}

					{isAdmin === true && userDetail.data.role !== "admin" && (
						<Navigate to="/login" />
					)}

					<Component {...params} />
				</>
			)}
		</>
	);
};
export default ProtectedRoute;
