import { createFileRoute } from '@tanstack/react-router';
import { HomeComponent } from '../components/home';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});
