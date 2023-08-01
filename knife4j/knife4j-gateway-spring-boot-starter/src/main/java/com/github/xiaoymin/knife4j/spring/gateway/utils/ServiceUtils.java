/*
 * Copyright © 2017-2023 Knife4j(xiaoymin@foxmail.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


package com.github.xiaoymin.knife4j.spring.gateway.utils;

import com.github.xiaoymin.knife4j.spring.gateway.Knife4jGatewayProperties;
import com.github.xiaoymin.knife4j.spring.gateway.spec.v2.OpenAPI2Resource;
import lombok.extern.slf4j.Slf4j;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.*;

/**
 * 在服务发现(Discover)场景下的聚合辅助工具类
 * @author <a href="xiaoymin@foxmail.com">xiaoymin@foxmail.com</a>
 * 2023/7/31 15:05
 * @since knife4j v4.2.0
 */
@Slf4j
public class ServiceUtils {
    
    private final static String LB = "lb://";
    
    /**
     * 判断服务路由是否负载配置
     * @param uri 路由
     * @return True-是，False-非lb
     */
    public static boolean startLoadBalance(URI uri) {
        if (uri == null) {
            return false;
        }
        String path = uri.toString();
        if (path == null || path.isEmpty()) {
            return false;
        }
        return path.startsWith(LB);
    }
    
    /**
     * 判断是否包含服务
     * @param uri 路由服务
     * @param service 服务列表
     * @param excludeService 已排除服务列表
     * @return  True-是，False-非
     */
    public static boolean includeService(URI uri, Collection<String> service, Collection<String> excludeService) {
        String serviceName = uri.getHost();
        return service.contains(serviceName) && !excludeService.contains(serviceName);
    }
    
    /**
     * 添加默认开发者自定义配置的资源聚合路由
     * @param resources 路由集合
     * @param gatewayProperties 开发者个性化配置
     */
    public static void addCustomerResources(Collection<OpenAPI2Resource> resources, Knife4jGatewayProperties gatewayProperties) {
        if (resources == null || resources.isEmpty() || gatewayProperties == null) {
            return;
        }
        // 在添加自己的配置的个性化的服务
        if (gatewayProperties.getRoutes() != null) {
            for (Knife4jGatewayProperties.Router router : gatewayProperties.getRoutes()) {
                OpenAPI2Resource resource = new OpenAPI2Resource(router.getOrder(), false);
                resource.setName(router.getName());
                // 开发者配什么就返回什么
                resource.setUrl(router.getUrl());
                resource.setContextPath(router.getContextPath());
                resource.setId(Base64.getEncoder().encodeToString((resource.getName() + resource.getUrl() + resource.getContextPath()).getBytes(StandardCharsets.UTF_8)));
                resources.add(resource);
            }
        }
    }
    
}
