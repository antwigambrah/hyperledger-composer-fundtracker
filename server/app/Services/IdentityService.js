/*eslint-disable*/
const BusinessNetworkConnection=require('composer-client').BusinessNetworkConnection
var self=this
class  IdentityService {
constructor(){
self.bizNetworkConnection=new BusinessNetworkConnection()
}

async issueIdentity(participant){
    await self.bizNetworkConnection.connect('admin@decentralizedgov-network')
    const approverParticipantId=participant.firstname.charAt(0).concat(".").concat(participant.lastname).concat("@decentralizedgov-network")
    let result = await self.bizNetworkConnection.issueIdentity(participant.class,approverParticipantId)
 
    return {
        "userId":result.userID,
        "userSecret":result.userSecret
    }
}


async revokeIdentity(){

}

}

module.exports=new IdentityService();