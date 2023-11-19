({
    dropDownOptions : function(component, event, helper) {
        var action = component.get("c.findPicklistOptions");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                var optionsMap = [];
                for(var key in result){
                    optionsMap.push({key: key, value: result[key]});
                }
                component.set("v.options", optionsMap);
            }
        });
        $A.enqueueAction(action);
    },
    
})