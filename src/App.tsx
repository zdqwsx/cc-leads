import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import Home from '@/pages/Home';
import PageView from '@/pages/PageView';
import PageList from '@/components/PageCard/PageList';
import FlowList from '@/pages/FlowList';
import FlowView from '@/pages/FlowView';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pages" element={<PageList />} />
          <Route path="/page/:id" element={<PageView />} />
          <Route path="/flows" element={<FlowList />} />
          <Route path="/flow/:flowId" element={<FlowView />} />
        </Route>
      </Routes>
    </Router>
  );
}
