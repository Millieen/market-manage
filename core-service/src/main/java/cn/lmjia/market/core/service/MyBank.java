package cn.lmjia.market.core.service;

import cn.lmjia.cash.transfer.EntityOwner;
import cn.lmjia.cash.transfer.OwnerAccount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * 利每家的账户
 */
@Component
public class MyBank implements EntityOwner{


    @Autowired
    private Environment environment;

    @Override
    public OwnerAccount getOwnerAccount(String supplierName) {
        if ("兴业银行".equalsIgnoreCase(supplierName) || supplierName==null){
            return new OwnerAccount() {
                @Override
                public String getAccountNum() {
                    //目前不知道
                    return null;
                }

                @Override
                public String getName() {
                    //
                    return null;
                }

                @Override
                public String getBankDesc() {
                    return "兴业银行";
                }

                @Override
                public String getCity() {
                    return "杭州市";
                }

                @Override
                public Map<String, String> getLoginInformation() {
                    Map<String, String> message = new HashMap<>();
                    message.put("cId","3500918700");
                    message.put("userId","");
                    message.put("userPass","");
                    return null;
                }
            };
        }
        return null;
    }

    @Override
    public String getOwnerName() {
        return environment.getProperty("market.owner","利每家");
    }
}
