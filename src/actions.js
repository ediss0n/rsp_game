import model from './model';

const gear = {
  subs: { },
  
  init: function(component, updater) {
    this.subs[component] = updater;
    return model[component];
  },
  
  notify: function(components) {
    components.forEach((c,i) => { 
      if (this.subs[c])
        this.subs[c](model[c]);
    });
  },
  
  unlink: function(component) {
    delete this.subs[component];
  },
  
  updateModel: function(obj) {
    let need_notify = [];
    for(let key in obj) {
      need_notify.push(key);
      if (obj[key] !== null && typeof obj[key] === 'object') {
        for (let idx in obj[key])
          model[key][idx] = obj[key][idx];
      }
      else {
        model[key] = obj[key];
      }
    }
    this.notify(need_notify);
  },
  
  getGameState: function() {
    return model.App.game_status;
  },
  
  getItems: function() {
    return model.items;
  },
  
  startGamePlayer2Comp: function() {
    this.updateModel({
      App: { game_status: 1 },
      Game: { game_type: 0 }
    });
  },
  
  startGameComp2Comp: function() {
    this.updateModel({
      App: { game_status: 1 },
      Game: { game_type: 1 }
    });
  },
  
  endGame: function() {
    this.updateModel({
      Score: { data: [0, 0] },
      Game: { game_type: 0, first_current: '', second_current: '' },
      App: { game_status: 0 }
    });
    this.save_score();
  },
  
  playerHit: function(weapon, idx) {    
    if (model.Game.round_started) {
      let comp_idx = this.generateMove();
      this.updateModel({
        Game: { 
          first_current: idx, 
          second_current: comp_idx,
          round_started: 0,  
        }
      });
      this.setWinner();
    }
  },
  
  startRound: function() {
    this.updateModel({ 
      Game: { 
        first_current: '', 
        second_current: '',
        progress: 100,
        round_started: 1
      }
    });
  },
  
  updateRound: function(perc) {
    this.updateModel({ 
      Game: { 
        progress: perc
      }
    });    
  },
  
  timeEnded: function() {
    if (model.Game.game_type === 1) {
      this.updateModel({
        Game: { 
          first_current: this.generateMove(), 
          second_current: this.generateMove(),
          round_started: 0,  
        }
      });     
    }
    else {
      this.updateModel({ 
        Game: { 
          first_current: '', 
          second_current: '',
          round_started: 0
        }
      });  
    }
    this.setWinner();
  },
  
  generateMove: function() {
    return (Math.round(Math.random()*10) % model.items.length);
  },
  
  setWinner: function() {
    let items = model.items;
    let first = model.Game.first_current;
    let second = model.Game.second_current;
    if (first === '') {
      this.updateModel({
        Score: { data: [model.Score.data[0], model.Score.data[1] + 1] }
      });
      this.save_score();
      window.M.toast({html: model.messages[model.Game.game_type].time_over});
      return true;
    }
    if (items[first].beats.indexOf(items[second].name) !== -1) {
      // first win
       this.updateModel({
        Score: { data: [model.Score.data[0] + 1, model.Score.data[1]] }
      });
      this.save_score();
      window.M.toast({html: model.messages[model.Game.game_type].first_win});
      return true;     
    }
    if (items[second].beats.indexOf(items[first].name) !== -1) {
      // second win
      this.updateModel({
        Score: { data: [model.Score.data[0], model.Score.data[1] + 1] }
      });
      this.save_score();
      window.M.toast({html: model.messages[model.Game.game_type].second_win});
      return true;     
    }
    // there is no winner
    window.M.toast({html: model.messages[model.Game.game_type].no_winner});
  },
  
  save_score: function(score) {
    if (window.localStorage) {
      localStorage.setItem("rsp_game_score", model.Score.data.join(':'));
    }
  },
  
  load_score: function() {
    if (window.localStorage) {
      let saved = localStorage.getItem("rsp_game_score");
      if (saved) {
        this.updateModel({
          Score: { data: saved.split(':').map((el)=>parseInt(el,10)) }
        });
      }
    }   
  }
}

export default gear;