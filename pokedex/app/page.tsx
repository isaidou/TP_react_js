
import { redirect } from 'next/navigation';

export default function Home() {
  // Redirection vers la page des pokémons
  redirect('/pokemons');
}