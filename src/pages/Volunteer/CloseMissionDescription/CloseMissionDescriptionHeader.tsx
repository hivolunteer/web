import { MdOutlineCalendarMonth, MdOutlineNearMe } from 'react-icons/md';
import getDate from '../../../functions/getDate';
import getHour from '../../../functions/getHour';
import { Mission } from '../../../interfaces';
import { Volunteer } from '../../Association/Missions/Manage/Interfaces';

const MissionDetailsHeader = (props: { mission: Mission, volunteer: Volunteer, location: string }) => {

    const { mission, volunteer, location } = props;

    return (
        <div className='mission-details-header'
            style={{
                backgroundImage: `url(${(mission?.picture)? mission?.picture : volunteer?.profile_picture})`,
                backgroundSize: 'cover',
                marginTop: '2%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                color: 'white',
            }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.5)',
            }} />
            <div className='mission-details-header-content'>
                <div className='mission-details-header-content-up'>
                    <p> {mission?.title} </p>
                </div>
                <div className='mission-details-header-content-down'>
                    <div className='mission-details-header-row'>
                        <MdOutlineCalendarMonth />
                        <p> {getDate(mission?.start_date as Date)} </p>
                    </div>
                    <div className='mission-details-header-row' style={{ marginLeft: '25px' }}>
                        <p> {getHour(mission?.start_date as Date)} - {getHour(mission?.end_date as Date)} </p>
                    </div>
                    <div className='mission-details-header-row'>
                        <MdOutlineNearMe />
                        <p style={{ textDecoration: 'underline' }}> {location} </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MissionDetailsHeader;