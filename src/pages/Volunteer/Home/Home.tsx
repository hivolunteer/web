import './Home.scss';
import './NewHome.scss';
import SearchSection from './SearchSection';
import MissionsPanel from './MissionsPanel';

function Home(props: any) {

  return (
    <div>
      <SearchSection />
      <MissionsPanel />
    </div>
  )
}

export default Home;