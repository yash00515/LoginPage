const User = require("../Models/userSchema");

exports.getLogin = (req, res) => {
  res.render("login", { error: null });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.render("login", { error: "Invalid email or password" });
  }

  req.session.userId = user._id;
  res.redirect("/dashboard");
};

exports.getSignup = (req, res) => {
  res.render("signup", { error: null });
};

exports.postSignup = async (req, res) => {
  const { name, email, password, mobile } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", { error: "Email already exists" });
    }

    const user = new User({ name, email, password, mobile });
    await user.save();
    res.redirect("/login");
  } catch (err) {
    res.render("signup", { error: "Something went wrong" });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};

exports.getReset = (req, res) => {
  res.render("reset", { error: null, message: null });
};

exports.postReset = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("reset", { error: "Email not found", message: null });
    }

    user.password = newPassword;
    await user.save();

    res.render("reset", { message: "Password updated successfully", error: null });
  } catch (err) {
    res.render("reset", { error: "Something went wrong", message: null });
  }
};
