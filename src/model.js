export default {
  App: {
    game_status: 0
  },
  Game: {
    game_type: 0,
    round_started: 0,
    first_current: '',
    second_current: '',
    progress: 100
  },
  Score: {
    data: [0, 0]
  },
  messages: [
    {
      first_win: "Congratulations, you win!",
      second_win: "Sorry, you loose!",
      no_winner: "No winner, let's try again",
      time_over: "Sorry, but time is out, you loose!"
    },
    {
      first_win: "First computer wins!",
      second_win: "Second computer wins!",
      no_winner: "No winner, hit button again",
      time_over: "Sorry, but time is out, and it's strange..."      
    }
  ],
  items: [
    { 
      name: 'Rock', 
      icon: 'cloud',
      beats: 'Scissors'
    },
    { 
      name: 'Scissors',
      icon: 'content_cut',
      beats: 'Paper'
    },      
    { 
      name: 'Paper',
      icon: 'insert_drive_file',
      beats: 'Rock'
    },      
  ]
};