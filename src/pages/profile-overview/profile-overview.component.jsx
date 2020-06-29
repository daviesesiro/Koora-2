// import React from 'react';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// import {db, auth} from '../../firebase/firebase.utils';

// import {selectCurrentUser,selectUserEvents } from '../../redux/user/user.selector';
// import { setUserEvents } from '../../redux/user/user.actions'
// import { toggleModal } from '../../redux/event/event.actions';

// import Button2 from '../../components/button/button2.component';
// import EventForm from '../../components/event-form/event-form.component';
// import Spinner from '../../components/spinner/spinner.component';
// import EventItem from '../../components/event-item/event-item.component';
// import Modal from '../../components/modal/modal.component';

// import './profile-overview.styles.scss';
// import { Link } from 'react-router-dom';

// class ProfileOverview extends React.Component {
//     state = {
//         loading: false
//     }

//     componentDidMount() {
//         const { currentUser, setEvents } = this.props;
//         document.title = `Koora | ${currentUser.email}`;
//         this.setState({ loading: true });
        
//         if(currentUser){
//             db.collection('events').where('userId', "==", `${currentUser.userId}`)
//                 .orderBy('start_at', 'desc').get().then((snapshot) => {
                
//                 setEvents(snapshot.docs.map(doc=>({id: doc.id,...doc.data()})));
//                 this.setState({ loading: false });            
//             });
//         }
//     }

//     render() {
//         const { currentUser, userEvents, toggleModal, history, match } = this.props;
//         const { loading } = this.state;         
//         return (            
//             <div className="profile-page">
//                 <Modal title='Create Event'>
//                     <EventForm/>
//                 </Modal>
                
//                 <div className='top-content'>
//                     <h1 className='username'>{currentUser.email}</h1>
                    
//                     <div className='btn-container'>
//                         <Button2
//                             type='button'
//                             color='blue'
//                             handleClick={toggleModal}
//                             className='btn add-event'
//                         >
//                             Add Event
//                         </Button2>
//                         <Button2
//                             color='red'
//                             handleClick={() => auth.signOut()}
//                             className='btn logout' 
//                         >
//                             Logout
//                         </Button2>
//                     </div>
//                     <hr/>
//                     <hr/>
//                     <h3 className='sub-head'>These are your events</h3>
//                 </div>

//                 <div className="event-items-container">
//                     {(!loading) ?
//                         <div className='event-items'>
//                             {userEvents.map(({ id, ...otherProps }) => (
//                                 <Link key={id} to={`${match.path}/${id}`}>
//                                     <EventItem {...otherProps} />
//                                 </Link>
//                             ))}
//                         </div>
//                     :
//                     <Spinner/>
//                     }
//                 </div>                    
                
//             </div>
//             );
//     }
// }
// const mapStateToProps = createStructuredSelector({
//     currentUser: selectCurrentUser,
//     userEvents: selectUserEvents
// });

// const mapDispatchToProps = dispatch => ({
//     setEvents: (events) => dispatch(setUserEvents(events)),
//     toggleModal: () => dispatch(toggleModal())
// })

// export default connect(mapStateToProps, mapDispatchToProps)(ProfileOverview);