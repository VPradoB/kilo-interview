import ZoneList from './modules/zones/components/ZoneList';
import ZoneSelector from './modules/zones/components/ZoneSelector';
import AwardList from './modules/awards/components/AwardList';
import ZoneAwardForm from './modules/awards/components/ZoneAwardForm';
import Pagination from './modules/awards/components/Pagination';
import ApplicationList from './modules/applications/components/ApplicationList';

function App() {
  return (
    <div>
      <h1>Hello World</h1>
      {/* Zones Module */}
      <div>
        <h2>Zones</h2>
        <ZoneList />
        <ZoneSelector />
      </div>
      {/* Awards Module */}
      <div>
        <h2>Awards</h2>
        <ZoneAwardForm />
        <AwardList />
        <Pagination currentPage={1} totalPages={1} />
      </div>
      {/* Applications Module */}
      <div>
        <h2>Applications</h2>
        <ApplicationList />
      </div>
    </div>
  )
}

export default App
