package com.shiro.model;

public class Permission {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_permission.id
     *
     * @mbggenerated Tue Sep 05 16:58:50 CST 2017
     */
    private Integer id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_permission.permissionname
     *
     * @mbggenerated Tue Sep 05 16:58:50 CST 2017
     */
    private String permissionname;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_permission.role_id
     *
     * @mbggenerated Tue Sep 05 16:58:50 CST 2017
     */
    private Integer roleId;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_permission.id
     *
     * @return the value of t_permission.id
     *
     * @mbggenerated Tue Sep 05 16:58:50 CST 2017
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_permission.id
     *
     * @param id the value for t_permission.id
     *
     * @mbggenerated Tue Sep 05 16:58:50 CST 2017
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_permission.permissionname
     *
     * @return the value of t_permission.permissionname
     *
     * @mbggenerated Tue Sep 05 16:58:50 CST 2017
     */
    public String getPermissionname() {
        return permissionname;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_permission.permissionname
     *
     * @param permissionname the value for t_permission.permissionname
     *
     * @mbggenerated Tue Sep 05 16:58:50 CST 2017
     */
    public void setPermissionname(String permissionname) {
        this.permissionname = permissionname == null ? null : permissionname.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_permission.role_id
     *
     * @return the value of t_permission.role_id
     *
     * @mbggenerated Tue Sep 05 16:58:50 CST 2017
     */
    public Integer getRoleId() {
        return roleId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_permission.role_id
     *
     * @param roleId the value for t_permission.role_id
     *
     * @mbggenerated Tue Sep 05 16:58:50 CST 2017
     */
    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }
}