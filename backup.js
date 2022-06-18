if(message.includes('hai')){
    if (name == null){
        msg.reply('Hello, Iam bot from *GMF Aero Asia*');
        msg.reply('Whats is your name ?');
        flag_name_question = true;
    } else {
        result = result.concat('Hello ', name , 'Iam bot from *GMF Aero Asia*');
        msg.reply(result);
        flag_name_question = false;
    }
    
}
else if (message.includes('not') && message.includes('my name') ) {
    msg.reply('Ok, Whats is your name ?');
} 
else if (flag_name_question){
    if(message.includes('my name is')){
        name = message.substring(11);
        result = result.concat('Hello *', name , '*, Iam bot from *GMF Aero Asia*');
        msg.reply(result);
    } else {
        result = result.concat('Hello *', message , '*, Iam bot from *GMF Aero Asia*');
        msg.reply(result);
    }
    flag_name_question = false;
}