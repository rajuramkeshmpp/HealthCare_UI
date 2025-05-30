import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import '../App.css';

const Header = () => {
    const navigate = useNavigate();

    const user = useAuthStore((state) => state.user);
    const role = useAuthStore((state) => state.role);
    const logout = useAuthStore((state) => state.logout);
    // const chapterdata = useAuthStore((state) => state.setChapter);

    // const [standards, setStandards] = useState([]);
    // const [subjects, setSubjects] = useState([]);
    // const [subjectId, setSubjectId] = useState('');
    // const [standardId, setStandardId] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [showEditProfile, setShowEditProfile] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // useEffect(() => {
    //     if (role.name === "Student") {
    //         axios.get("https://localhost:7160/api/Standard/GetAllStandard")
    //             .then(res => setStandards(res.data))
    //             .catch(err => console.error("Failed to fetch standards", err));

    //         axios.get("https://localhost:7160/api/Subject/GetAllSubject")
    //             .then(res => setSubjects(res.data))
    //             .catch(err => console.error("Failed to fetch subjects", err));
    //     }
    // }, [role]);

    // const GetAllChapter = (stdId, subId) => {
    //     if (!stdId || !subId) return;

    //     axios.get(`https://localhost:7160/api/Sidebar/ChapterSidebar?standardId=${stdId}&subjectId=${subId}`)
    //         .then(response => chapterdata(response.data))
    //         .catch(err => console.error("Failed to fetch chapters", err));
    // };

    // const handleStandardChange = (e) => {
    //     const selectedStandardId = e.target.value;
    //     setStandardId(selectedStandardId);
    //     GetAllChapter(selectedStandardId, subjectId);
    // };

    // const handleSubjectChange = (e) => {
    //     const selectedSubjectId = e.target.value;
    //     setSubjectId(selectedSubjectId);
    //     GetAllChapter(standardId, selectedSubjectId);
    // };

    const handleLogout = () => {
        logout();
        setTimeout(() => navigate('/'), 100);
    };

    return (
        <>
            <header className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="logo" style={{ marginRight: '20px' }}>Shiwansh Tutorial</div>

                    {/* {role.name === "Student" && (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <select className="form-control" value={standardId} onChange={handleStandardChange}>
                                <option value="">Select Standard</option>
                                {standards.map(std => (
                                    <option key={std.id} value={std.id}>{std.name}</option>
                                ))}
                            </select>

                            <select className="form-control" value={subjectId} onChange={handleSubjectChange}>
                                <option value="">Select Subject</option>
                                {subjects.map(sub => (
                                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                                ))}
                            </select>
                        </div>
                    )} */}
                </div>

                <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }} ref={dropdownRef}>
                    {user && role && (
                        <>
                            <img
                                src={`/${user.name}.jpg`}
                                alt="User Icon"
                                className="user-icon"
                                onClick={() => setDropdownVisible(!dropdownVisible)}
                                style={{ width: '30px', height: '30px', cursor: 'pointer', borderRadius: '50%' }}
                            />
                            <span className="username">{user.name} ({role.name})</span>

                            {dropdownVisible && (
                                <div style={{
                                    position: 'absolute',
                                    top: '40px',
                                    right: '0',
                                    backgroundColor: '#fff',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
                                    zIndex: 1000,
                                    width: '150px',
                                    padding: '10px'
                                }}>
                                    <div style={{ padding: '8px 0', cursor: 'pointer', color: 'red' }} onClick={() => setShowEditProfile(true)}>
                                        Edit Profile
                                    </div>
                                    <div style={{ padding: '8px 0', cursor: 'pointer', color: 'red' }} onClick={handleLogout}>
                                        Sign Out
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                    <FaSignOutAlt className="icon" onClick={handleLogout} title="Logout" />
                </div>
            </header>

            {/* Edit Profile Modal */}
            {showEditProfile && (
                <div className="modal-overlay" onClick={() => setShowEditProfile(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Edit Profile</h2>
                        <form>
                            <label className="form-label">First Name</label>
                            <input type="text" placeholder="First Name" defaultValue={user.firstname} className="form-control"/>
                            <label className="form-label">Last Name</label>
                            <input type="text" placeholder="Last Name" defaultValue={user.lastname} className="form-control" />
                            <label className="form-label">Upload Image</label>
                            <input type="file" name="image"  className="form-control"  accept="image/*" />
                            <label className="form-label">Present Address</label>
                            <input type="textarea"   className="form-control"   />
                            <label className="form-label">Permanent Address</label>
                            <input type="textares"   className="form-control"   />
                            {/* Add more fields as needed */}
                            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                <button type="submit" className="btn btn-primary">Update</button>
                                <button type="button" className="btn btn-secondary" onClick={() => setShowEditProfile(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

           
        </>
    );
};

export default Header;
