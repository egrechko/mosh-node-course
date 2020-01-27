console.log('Before');
// getUser(1, (user) => {
//     getRepos(user.gitHubUsername, (repos) => {
//         console.log('Repos', repos);
//         getCommits(repos, (commits) => {
//             console.log(commits);
//         });
//     });
// });

// getUser(1)
//     .then(user => getRepos(user.gitHubUsername))
//     .then(repos => getCommits(repos[2]))
//     .then(commits => console.log(commits))
//     .catch(err => console.error('Error', err.message));

async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepos(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }
    catch (error) {
        console.error(error);
    }
}

displayCommits();

console.log('After');


function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            console.log('Reading a user from database...');
            resolve({ id: id, gitHubUsername: 'eugene' });
        }, 2000);
    });
}

function getRepos(username) {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            console.log(`Fetching repositories for ${username}`);
            // resolve( ['repo1', 'repo2', 'repo3'] );
            reject(new Error('couldn\'t fetch repositories.'));
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            console.log('Calling github api for ', repo);
            resolve(['commit1', 'commit2']);
        }, 2000);
    });
}