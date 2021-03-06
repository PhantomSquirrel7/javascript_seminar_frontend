/**
 * globy-backend
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 0.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { ClassesclassIdprojectsprojectIdmeetingsTaskList } from './classesclassIdprojectsprojectIdmeetingsTaskList';
import { ClassesclassIdprojectsprojectIdmeetingsmeetingIdGroups } from './classesclassIdprojectsprojectIdmeetingsmeetingIdGroups';

export interface InlineResponse2005 { 
    id?: string;
    project?: string;
    date?: Date;
    groupAssignment?: InlineResponse2005.GroupAssignmentEnum;
    groups?: Array<ClassesclassIdprojectsprojectIdmeetingsmeetingIdGroups>;
    taskList?: ClassesclassIdprojectsprojectIdmeetingsTaskList;
    duration?: number;
    joinUrl?: string;
}
export namespace InlineResponse2005 {
    export type GroupAssignmentEnum = 'tandem' | 'group3' | 'group4' | 'whole_class';
    export const GroupAssignmentEnum = {
        Tandem: 'tandem' as GroupAssignmentEnum,
        Group3: 'group3' as GroupAssignmentEnum,
        Group4: 'group4' as GroupAssignmentEnum,
        WholeClass: 'whole_class' as GroupAssignmentEnum
    };
}