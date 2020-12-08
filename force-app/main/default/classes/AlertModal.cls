public with sharing class AlertModal {
    
    @AuraEnabled
    public static String getSobjectType(Id recordId){
        return String.valueOf( recordId.getSobjectType() );
    }

    @AuraEnabled
    public static SObject checkField(String recordId, String field){
    try {

            String object_name = getSobjectType(recordId);
            String query = 'SELECT '+field+' FROM '+object_name+' WHERE Id = \''+recordId+'\' LIMIT 1';
            SObject obj = Database.query( query );
            return obj;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
