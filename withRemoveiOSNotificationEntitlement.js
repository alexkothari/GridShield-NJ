const { withEntitlementsPlist } = require('@expo/config-plugins');

const withRemoveiOSNotificationEntitlement = (config) => {
  return withEntitlementsPlist(config, (mod) => {
    mod.modResults = { ...mod.modResults, 'aps-environment': undefined };
    return mod;
  });
};

module.exports = withRemoveiOSNotificationEntitlement;