// Keep track of which names are used so that there are no duplicates
var userRegister = {
  names: {},
  claim: function (name) {
    if (!name || this.names[name]) {
      return false;
    } else {
      this.names[name] = true;
      return true;
    }
  },
  getGuestName: function () {
    var name,
      nextUserId = 1;

    do {
      name = 'Guest ' + nextUserId;
      nextUserId += 1;
    } while (!this.claim(name));

    return name;
  },
  get: function () {
    var res = [];
    for (user in this.names) {
      res.push(user);
    }

    return res;
  },
  free: function (name) {
    if (this.names[name]) {
      delete this.names[name];
    }
  }
};

// The smart bot 
var smartBot = {
  botKnownQuestions: {},
  addQuestion: function(q) {
    this.botKnownQuestions[q] = '';
  },
  wasQuestionAnswered: function(q) {
   return this.getAnswer(q) ? true : false;
  },
  wasQuestionAsked: function(q) {
    return this.botKnownQuestions.hasOwnProperty(q);
  },
  getAnswer: function(q) {
    return this.botKnownQuestions[q];
  },
  addAnswer: function(a) {
    var questions = this.botKnownQuestions;
    Object.keys(questions).some(function(k){
      if(questions[k] === ''){
        questions[k] = a;
        return true;
      }
      return false;
    });
  },
  loadBotKnowledge: function() {
    var q = 'what\'s this app called';
    this.botKnownQuestions[q] = 'SmartBot';
  }
};

smartBot.loadBotKnowledge();

module.exports = {
  userNames: userRegister,
  smartBot: smartBot
};
