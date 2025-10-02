import ZoneAwardForm from './modules/awards/components/ZoneAwardForm';
import ApplicationList from './modules/applications/components/ApplicationList';

function App() {
  return (
    <div>
      {/* Awards Module */}
      <div>
        <h2>Awards</h2>
        <ZoneAwardForm />
      </div>
      {/* Applications Module */}
      <div >
        <h2>Applications</h2>
        <ApplicationList />
      </div>
    </div>
  )
}

export default App
