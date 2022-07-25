var same = [ [ "05", "19", "07", "11" ], ["10", "16", "08" ], ["04", "14", "20"] ];
var teamid = [];

var roll = "";
var players = [];
var CPL = 5;

function RandomInt2(max)
{
    return Math.floor(Math.random() * max);
}

function PlayersToString()
{
    let ans = "";
    let cnt = 0;
    for (let i = 0; i < players.length; ++i)
    {
        ans = ans + players[i] + "\n";
        if (++cnt == CPL)
        {
            ans = ans + "\n";
            cnt = 0;
        }
    }
    return ans;
}

function GetTeamOfPlayer(number)
{
    return Math.floor(players.indexOf(number) / CPL);
}

function GetPlayersOfTeam(number)
{
    let res = [];
    for (let i = 0; i < players.length; ++i)
    {
        if (GetTeamOfPlayer(players[i]) == number)
        {
            res.push(players[i]);
        }
    }
    return res;
}

function AddPlayerToTeam(player, team, x)
{
    let current_team = GetPlayersOfTeam(team);
    
    //todo remove elements that should stay incase random hits them all the time
    
    let kick_id = RandomInt2(current_team.length); // CPL
    let kick_number = current_team[kick_id];
    while (same[x].indexOf(kick_number) != -1)
    {
        kick_id = RandomInt2(current_team.length); // CPL
        kick_number = current_team[kick_id];
    }
    
    let tmp = players.indexOf(kick_number);
    players[players.indexOf(player)] = kick_number;
    players[tmp] = player;
    
    //alert(kick_number + " <-> " + player);
    
    //document.getElementsByClassName("child")[0].innerText = PlayersToString();
}

function KickPlayerFromTeam(player, team, x)
{
}

document.addEventListener('keydown', function(e) 
{
    if (e.keyCode == 39) 
    {
	// fill same
        roll = document.getElementsByClassName("child")[0].innerText;
        if (roll.search("\n\n") != -1)
        {
            players = [];
            let teams = roll.split("\n\n").filter(function(el) { return el.length !== 0 });
            for (let i = 0; i < teams.length; ++i)
            {
                let tmp_players = teams[i].split("\n").filter(function(el) { return el.length !== 0 });
                for (let j = 0; j < tmp_players.length; ++j)
                {
                    players.push(tmp_players[j]);
                }
            }
            
            cnt_rand = 0;
            while (++cnt_rand < 123)
            {
                let a = RandomInt2(players.length);
                let b = RandomInt2(players.length);
                let tmp = players[a];
                players[a] = players[b];
                players[b] = tmp;
            }
            
            // check if predefined groups are correct 
           
            let act_teams_amount = Math.floor(players.length / CPL);
            if (act_teams_amount < same.length)
                alert("error #1");
            for (let i = 0; i < same.length; ++i) // same.length - 1
            {
                for (let j = 0; j < same[i].length; ++j)
                {
                    for  (let q = i; q < same.length; ++q) // i + 1
                    {
                        if (same[q].indexOf(same[i][j]) != -1 && q != i)
                        {
                            alert("error #2");
                            break;
                        }
                    }
                }
            }
           
            teamid = [];
            while (teamid.length < same.length)
            {
                let random_team_id = RandomInt2(act_teams_amount);
                while (teamid.indexOf(random_team_id) != -1)
                {
                    random_team_id = RandomInt2(act_teams_amount);
                }
                teamid.push(random_team_id);
            }
           
            
            for (let i = 0; i < same.length; ++i)
            {
                let to_team = teamid[i];
                for (let j = 0; j < same[i].length; ++j)
                {
                    let cur_team = GetTeamOfPlayer(same[i][j]);
                    if (to_team != cur_team && players.indexOf(same[i][j]) != -1)
                    {
                        AddPlayerToTeam(same[i][j], to_team, i);
                    }
                }
            }
            
            // alert(players);
            
            document.getElementsByClassName("child")[0].innerText = PlayersToString();
        }
    }
});