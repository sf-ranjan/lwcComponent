trigger OrderEventTrigger on Order_Event__e (after insert) {
    List<Task>tsks = new List<Task>();
    for(Order_Event__e order:Trigger.new){
        if(order.Has_Shipped__c==true){
            Task tsk = new Task();
            tsk.Subject = 'Follow up on shipped order 105';
            tsk.Priority = 'Normal';
            tsk.OwnerId = order.CreatedById;
            tsk.Status = 'Not Started';
            tsks.add(tsk);
            
        }
    }
    
    insert tsks;
}