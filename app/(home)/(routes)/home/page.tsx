import GetRootAPIServer from "@/actions/root/RootApiServer";
import { FilmesActions } from "@/actions/root/filmes/api";
import HomeClient from "./components/homeClient";
import NoData from "@/components/base/noData";

export default async function HomePage() {
  const serverApi = await GetRootAPIServer();

  const allFilmesDisponiveis = await FilmesActions.getFilmesDisponiveis(
    serverApi
  );

  if (!allFilmesDisponiveis.length)
    return <NoData text="Não há filmes cadastrados" />;

  return (
    <>
      <HomeClient slides={allFilmesDisponiveis} />
    </>
  );
}
