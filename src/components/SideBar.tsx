import { Button } from "./Button"
import { GenreResponseProps } from '../App'
import { useEffect, useState } from "react";
import { api } from "../services/api";

interface SideBarProps {
  handleSelectedGenreId: React.Dispatch<React.SetStateAction<number>>;
  selectedGenreId: number;
}

export const SideBar = ({ handleSelectedGenreId, selectedGenreId }: SideBarProps) => {

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  const handleClickButton = (id: number) => {
    handleSelectedGenreId(id)
  }

  return (

    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}