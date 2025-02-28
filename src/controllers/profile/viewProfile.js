
const userProfile=  async (req, res) => {
    try {
      const userDetail = req.user;
      console.log("User details:", userDetail);
       
      res.send("user details are displayed"); 
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  }
  module.exports=userProfile;
