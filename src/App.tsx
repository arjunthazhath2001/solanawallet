import { ThemeProvider } from './components/theme-provider';
import User from './User';
function App() {
  return (
    <ThemeProvider>

      <User/>
    </ThemeProvider>
  );
}

export default App;
