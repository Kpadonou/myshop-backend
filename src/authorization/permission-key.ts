export const enum PermissionKey {
    // For accessing own (logged in user) profile
    ROLE_USER = 'ROLE_USER',
    // For creating a user
    ROLE_ADMIN = 'ROLE_ADMIN',
    // For updating own (logged in user) profile
    ROLE_SUPER_ADMIN = 'ROLE_SUPER_ADMIN',
    // For deleting a user
    DeleteOwnUser = 'DeleteOwnUser',

    //admin
    // For updating other users profile
    UpdateAnyUser = 'UpdateAnyUser',
    // For accessing other users profile.
    ViewAnyUser = 'ViewAnyUser',
    // For deleting a user
    DeleteAnyUser = 'DeleteAnyUser',
}