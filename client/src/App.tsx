import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import LessonGenerator from "./pages/LessonGenerator";
import Professor from "./pages/Professor";
import LessonDetail from "./pages/LessonDetail";
import Culture from "./pages/Culture";
import Literature from "./pages/Literature";
import Progress from "./pages/Progress";
import Courses from "./pages/Courses";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path="/courses" component={Courses} />
      <Route path="/professor" component={Professor} />
      <Route path="/lesson/:id" component={LessonDetail} />
      <Route path="/culture" component={Culture} />
      <Route path="/literature" component={Literature} />
      <Route path="/progress" component={Progress} />
      <Route path="/generator" component={LessonGenerator} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
