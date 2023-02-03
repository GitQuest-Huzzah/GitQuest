const Sequelize = require("sequelize");
const db = (() => {
  switch (process.env.ENVIRONMENT) {
    case "production":
      return new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
          dialect: "postgres",
          host: process.env.DB_CONNECTION,
          logging: false,
          dialectOptions: {
            socketPath: process.env.DB_CONNECTION,
          },
        }
      );

    default:
      return new Sequelize("postgres://localhost:5432/gitgoingdb", {
        logging: false,
      });
  }
})();

db.sync();

const Repos = db.define("repo", {
	repoId: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	repoName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

const Users = db.define("user", {
	slackID: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	gitHubID: {
		type: Sequelize.STRING,
	},
	gitHubLogin: {
		type: Sequelize.STRING,
	},
	gitHubToken: {
		type: Sequelize.STRING,
	},
	isAdmin: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
		allowNull: false,
	},
	commits: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
	pullRequests: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
	level: {
		type: Sequelize.INTEGER,
		defaultValue: 1,
	},
	title: {
		type: Sequelize.STRING,
		defaultValue: "Neophyte",
	},
	exp: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
	gold: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
	rewardGold: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
	achievements: {
		type: Sequelize.JSONB,
		defaultValue:
			"[{'0': 'You have installed GitQuest! The only achievement that truly matters.'}]",
	},
});

const Workspaces = db.define("workspace", {
	botToken: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	teamID: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	teamName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	orgName: {
		type: Sequelize.STRING,
	},
});

Users.belongsTo(Workspaces);
Workspaces.hasMany(Users);

Repos.belongsTo(Workspaces);
Workspaces.hasMany(Repos);

module.exports = {
  db,
  Repos,
  Users,
  Workspaces,
};



