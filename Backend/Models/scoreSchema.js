const scoreSchema = new mongoose.Schema({
    sport: String,
    team1: {
      name: String,
      score: Number,
      members: [String],
    },
    team2: {
      name: String,
      score: Number,
      members: [String],
    },
  });
  
  const Score = mongoose.model('Score', scoreSchema);