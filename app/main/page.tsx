import Chat from '@/app/components/chat'
import ProgressBar from '@/app/components/progress-bar';
import PersonalInfo from '../components/personal-info';
import MainGoal from '../components/main-goal';
import CurrentStage from '../components/current-stage';
import { MainNav } from '../components/main-nav';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex h-16 items-center px-4 col-span-3">
            
            <MainNav className="mx-6" />
           
          </div>

      <Chat />
      <ProgressBar progress={75} />
      <PersonalInfo />
      <MainGoal />
      <CurrentStage />
    </div>
  );
};

export default Dashboard;