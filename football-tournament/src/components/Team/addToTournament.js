import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { api } from "../../utils/request";
import Input from "../Auth/Input";

const AddToTournament = () => {
  const [team, setTeam] = useState("");
  const [tournament, setTournament] = useState("");
  const [tournaments, setTournaments] = useState([]);

  const params = useParams();
  const [cookies] = useCookies(["jwt"]);
  const navigate = useNavigate();
  console.log(params);

  useEffect(() => {
    api
      .get("tournaments/all", {
        "Content-Type": "application/json",
        "X-User-Token": cookies?.jwt,
      })
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
        setTournaments(data);
      });

    api
      .get(`teams/${params.teamId}`)
      .then((r) => r.json())
      .then((data) => {
        setTeam(data);
      });
  }, []);

  const addToTournament = () => {
    console.log(tournament)
    api
      .post("tournaments/addTeam", {
        teamId: params.teamId,
        tournamentId: tournament,
      })
      .then((response) => {
        if (response.ok) {
          navigate("/administration/tournaments/all");
        }
      });
  };

  return (
    <div>
      <div className="row">
        <label>Team</label>
        <Input
          label="Name"
          id="name"
          value={team.name}
          onChange={(e) => setTeam(e.target.value)}
        />
      </div>

      <div className="row">
        <label>Tournament</label>
        <select onChange={(e) => setTournament(e.target.value)}>
          <option>Select tournament</option>
          {tournaments.map((t) => {
            return <option value={t.id}>{t.name}</option>;
          })}
        </select>
      </div>

      <button onClick={addToTournament}>Add</button>
    </div>
  );
};

export default AddToTournament;
