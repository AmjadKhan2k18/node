console.log('before');
const khan = 'Amjad Khan';
getUser(2)
.then(user => getRepos(user.githubUsername))
.then(repos => console.log(repos));


console.log('after');


function getUser(id){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('reading data from database....');
            resolve({id: id,githubUsername: 'Khan'});
            reject(new Error('Can not read'));
        },2000);
    });
    
}

function getRepos(userName){
    return new Promise((resolve,rejected) => {
        setTimeout(() => {
            console.log('getting repositories....');
            resolve({repositories: ['repos1','repos2','repos3']});
            rejected(new Error('this is error message'));
        },2000);
    });
    
}