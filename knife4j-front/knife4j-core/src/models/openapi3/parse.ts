import { BaseCommonParser, ParseOptions } from '../knife4j/baseParse'
import { Knife4jInstance } from '../knife4j/type'
import { Knife4jTagObject } from "../knife4j/knife4jTag"
import { Knife4jExternalDocumentationObject } from "../knife4j/ExternalObject"
import { Knife4jInfoObject } from "../knife4j/knife4jInfo"
import lodash from 'lodash'
import { TagObject, InfoObject } from "./types"

/**
 * 解析OpenAPI3的规范,参考规范文档：https://spec.openapis.org/oas/v3.1.0
 */
export class OpenAPIParser extends BaseCommonParser {

    parse(data: Record<string, any>, options: ParseOptions): Knife4jInstance {
        console.log(options)
        const instance = new Knife4jInstance('1', '2', '3')
        instance.originalRecord = data;
        // info信息
        const info = data["info"] as InfoObject
        this.resolveInfo(info, instance)
        const tagArray = data["tags"] as TagObject[];
        //解析tag
        this.resolveTag(tagArray, instance)
        return instance;
    }


    /**
     * 解析tag
     * @param tagArray 分组源数据集
     * @param instance 实例对象
     */
    resolveTag(tagArray: TagObject[], instance: Knife4jInstance): void {
        if (lodash.isEmpty(tagArray)) {
            return;
        }
        tagArray.forEach(tag => {
            const _tag = new Knife4jTagObject(tag.name);
            //desc
            _tag.description = tag.description
            // 扩展属性
            _tag.order = tag['x-order'] || 0;
            //externalDocs
            if (!lodash.isEmpty(tag.externalDocs)) {
                const extObject = new Knife4jExternalDocumentationObject(tag.externalDocs.url)
                extObject.description = tag.externalDocs.description;
                _tag.externalDocs = extObject
            }
            instance.addTag(_tag)
        })
    }

    /**
     * 解析info
     * @param info 基础信息
     * @param instance 实例
     */
    resolveInfo(info: InfoObject, instance: Knife4jInstance): void {
        console.log(info)
        if (lodash.isEmpty(info)) {
            return;
        }
        const _info = new Knife4jInfoObject(info.title)
        _info.version = lodash.defaultTo(info.version, '')
        _info.description = lodash.defaultTo(info.description, '')
        _info.summary = lodash.defaultTo(info.summary, '');
        _info.termsOfService = lodash.defaultTo(info.termsOfService, '')
        // 判断联系人
        if (!lodash.isEmpty(info.contact)) {
            _info.email = lodash.defaultTo(info.contact.email, '')
            _info.name = lodash.defaultTo(info.contact.name, '')
            _info.url = lodash.defaultTo(info.contact.url, '')
        }
        //license
        if (!lodash.isEmpty(info.license)) {
            _info.licenseName = lodash.defaultTo(info.license.name, '')
            _info.licenseUrl = lodash.defaultTo(info.license.url, '')
        }
        //对象属性赋值
        instance.info = _info;
    }


}

