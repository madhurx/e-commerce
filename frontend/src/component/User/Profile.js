import React, { useEffect } from "react";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Profile.css";
import Loader from "../layout/Loader/Loader";

const Profile = () => {
	const { userDetail, loading, isAuthenticated } = useSelector((state) => state.user);
    // console.log(userDetail, loading, isAuthenticated)
	const user = userDetail?.user;
    const navigate = useNavigate();

    useEffect( () =>{
        if(isAuthenticated === false){
            navigate('/login')
        }
    }, [navigate, isAuthenticated]);

    // useEffect(() => {
    //  }, [userDetail]);

	return (
		<>
			{loading ? (
				<Loader />
			) : user ? (
				<>
					<MetaData title={`${user?.name}'s Profile`} />
					<div className="profileContainer">
						<div>
							<h1>My Profile</h1>
							<img
								src={user?.avatar?.url ? user?.avatar?.url : "/profile.png"}
								alt={user?.name}
							/>
							<Link to="/me/update">Edit Profile</Link>
						</div>
						<div>
							<div>
								<h4>Full Name</h4>
								<p>{user?.name}</p>
							</div>
							<div>
								<h4>Email</h4>
								<p>{user?.email}</p>
							</div>
							<div>
								<h4>Joined On</h4>
								<p>{String(user?.createdAt).substring(0, 10)}</p>
							</div>

							<div>
								<Link to="/orders">My Orders</Link>
								<Link to="/password/update">Change Password</Link>
							</div>
						</div>
					</div>
				</>
			) : null}
		</>
	);
};

export default Profile;
