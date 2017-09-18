package com.shiro.mapper;

import com.shiro.model.Role;
import com.shiro.model.RoleExample;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RoleMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_role
     *
     * @mbggenerated Tue Sep 05 16:58:22 CST 2017
     */
    int countByExample(RoleExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_role
     *
     * @mbggenerated Tue Sep 05 16:58:22 CST 2017
     */
    int deleteByExample(RoleExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_role
     *
     * @mbggenerated Tue Sep 05 16:58:22 CST 2017
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_role
     *
     * @mbggenerated Tue Sep 05 16:58:22 CST 2017
     */
    int insert(Role record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_role
     *
     * @mbggenerated Tue Sep 05 16:58:22 CST 2017
     */
    int insertSelective(Role record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_role
     *
     * @mbggenerated Tue Sep 05 16:58:22 CST 2017
     */
    List<Role> selectByExample(RoleExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_role
     *
     * @mbggenerated Tue Sep 05 16:58:22 CST 2017
     */
    Role selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_role
     *
     * @mbggenerated Tue Sep 05 16:58:22 CST 2017
     */
    int updateByExampleSelective(@Param("record") Role record, @Param("example") RoleExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_role
     *
     * @mbggenerated Tue Sep 05 16:58:22 CST 2017
     */
    int updateByExample(@Param("record") Role record, @Param("example") RoleExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_role
     *
     * @mbggenerated Tue Sep 05 16:58:22 CST 2017
     */
    int updateByPrimaryKeySelective(Role record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_role
     *
     * @mbggenerated Tue Sep 05 16:58:22 CST 2017
     */
    int updateByPrimaryKey(Role record);
}